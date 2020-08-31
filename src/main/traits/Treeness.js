'use strict'

const { Trait } = require('@northscaler/mutrait')
const {
  IllegalArgumentError,
  MissingRequiredArgumentError
} = require('@northscaler/error-support')
const { TreeCircularityError } = require('../errors')

const Treeness = Trait(
  superclass =>
    class extends superclass {
      _parent
      _children = []

      get isRoot () {
        return !this._parent
      }

      get children () {
        return [...this._children]
      }

      get childCount () {
        return this._children?.length || 0
      }

      get parent () {
        return this._parent
      }

      set parent (parent) {
        if (!parent)
          throw new MissingRequiredArgumentError({ message: 'parent' })

        this._testSetParent(parent)
        parent._testAddChild(this)

        this._doSetParent(parent)
        parent._doAddChild(this)
      }

      _testSetParent (parent) {
        if (this._parent)
          throw new IllegalArgumentError({ message: 'this already has parent' })
        if (!parent) throw new MissingRequiredArgumentError({ info: 'parent' })
        this._confirmIsThisType(parent)
        if (parent.identifies(this))
          throw new TreeCircularityError({ message: 'parent is child' })
        if (this.containsChild(parent, true))
          throw new TreeCircularityError({
            message: 'parent already contained by this'
          })
        if (this.containdByParent(parent, true))
          throw new TreeCircularityError({
            message: 'parent already contains this'
          })
        return parent
      }

      _doSetParent (parent) {
        this._parent = parent
      }

      _confirmIsThisType (that) {
        if (Object.getPrototypeOf(this) !== Object.getPrototypeOf(that))
          throw new IllegalArgumentError({
            info: that,
            message: 'node must be the same type of object as this'
          })
      }

      unsetParent () {
        // eslint-disable-next-line
        this._parent?.removeChild(this)
        return this
      }

      _testUnsetParent (parent) {
        if (!parent.identifies(this._parent))
          throw new IllegalArgumentError({
            message: 'this parent not given parent'
          })
      }

      _doUnsetParent () {
        delete this._parent
      }

      containsChild (child, recursively) {
        if (!child) throw new MissingRequiredArgumentError({ info: 'child' })
        if (!this._children?.length) return false
        const contains = !!this._children.some(it => it.identifies(child))
        if (contains || !recursively) return contains
        return this._children.some(it => it.containsChild(child, recursively))
      }

      containdByParent (parent, recursively) {
        if (!parent) throw new MissingRequiredArgumentError({ info: 'parent' })
        if (this.isRoot) return false
        const contained = parent.identifies(this._parent)
        if (contained || !recursively) return contained
        let p = this._parent.parent
        while (p) {
          if (p.identifies(parent)) return true
          p = p.parent
        }
        return false
      }

      addChild (child) {
        if (!child) throw new MissingRequiredArgumentError({ info: 'child' })
        this._confirmIsThisType(child)

        child.parent = this // delegate to setter
        return this
      }

      _testAddChild (child) {
        if (!child) throw new MissingRequiredArgumentError({ info: 'child' })
        if (this.containsChild(child, true))
          throw new TreeCircularityError({
            message: 'this already contains child'
          })
        if (this.containdByParent(child, true))
          throw new TreeCircularityError({
            message: 'this already contained by child'
          })

        return child
      }

      _doAddChild (child) {
        this._children = this._children || []
        this._children.push(child)
      }

      removeChild (child) {
        if (!child) throw new MissingRequiredArgumentError({ info: 'child' })

        this._testRemoveChild(child)
        child._testUnsetParent(this)

        this._doRemoveChild(child)
        child._doUnsetParent()

        return this
      }

      _testRemoveChild (child) {
        if (!this.containsChild(child))
          throw new IllegalArgumentError({
            message: 'this does not contain child'
          })
      }

      _doRemoveChild (child) {
        const i = this._children.indexOf(it => it.identifies(child))
        this._children.splice(i, 1)
      }

      get allChildren () {
        if (!this._children?.length) return []

        return this._children.reduce(
          (all, child) => {
            return (all = all.concat(child.allChildren))
          },
          [...this._children]
        )
      }

      asList (nodeTransformerFn) {
        nodeTransformerFn = nodeTransformerFn || (it => it)

        return (this._children || []).reduce(
          (accum, child) => {
            accum = accum.concat(child.asList(nodeTransformerFn))
            return accum
          },
          [nodeTransformerFn(this)]
        )
      }
    }
)

module.exports = Treeness
