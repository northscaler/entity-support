/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const uuid = require('uuid').v4
const { traits } = require('@northscaler/mutrait')
const { Treeness } = require('../../../main/traits')
const {
  IllegalArgumentError,
  MissingRequiredArgumentError
} = require('@northscaler/error-support')
const { TreeCircularityError } = require('../../../main/errors')

describe('unit tests of Treeness', () => {
  it('should work', function () {
    class Node extends traits(Treeness) {
      constructor ({ parent, name, eq } = {}) {
        super(...arguments)

        this.id = uuid()
        this.name = name

        if (parent) this.setParent(parent, eq)
      }
    }

    for (const eq in [(x, y) => x === y, (x, y) => x.name === y.name]) {
      const root = new Node({ name: 'root', eq })
      expect(root.allChildren).to.deep.equal([])
      expect(root.asNodeList(it => it.name)).to.deep.equal([root.name])
      expect(root.asNodeMapByProperty('id')).to.deep.equal({ [root.id]: root })

      const a1 = new Node({ parent: root, name: 'a1' })
      expect(root.containsChild(a1)).to.be.true()
      expect(a1.containedByParent(root)).to.be.true()
      expect(root.childCount).to.equal(1)
      expect(root.children).to.deep.equal([a1])
      expect(root.allChildren).to.deep.equal([a1])
      expect(
        root
          .asNodeList()
          .map(it => it.name)
          .sort()
      ).to.deep.equal(['a1', 'root'])
      expect(root.asNodeMapByProperty('id')).to.deep.equal({
        [root.id]: root,
        [a1.id]: a1
      })

      const a2 = new Node({ parent: root, name: 'a2' })
      expect(root.containsChild(a2)).to.be.true()
      expect(a1.containedByParent(root)).to.be.true()
      expect(root.childCount).to.equal(2)
      expect(root.children).to.deep.equal([a1, a2])
      expect(root.allChildren).to.deep.equal([a1, a2])
      expect(
        root
          .asNodeList()
          .map(it => it.name)
          .sort()
      ).to.deep.equal(['a1', 'a2', 'root'])
      expect(root.asNodeMapByProperty('id')).to.deep.equal({
        [root.id]: root,
        [a1.id]: a1,
        [a2.id]: a2
      })

      expect(() => root.addChild()).to.throw(MissingRequiredArgumentError)
      expect(() => root.addChild(root)).to.throw(TreeCircularityError)
      expect(() => a1.addChild(root)).to.throw(TreeCircularityError)
      expect(() => a1.addChild(a2)).to.throw(IllegalArgumentError)

      const a1b1 = new Node({ parent: a1, name: 'a1b1' })
      expect(root.containsChild(a1b1)).to.be.false()
      expect(root.containsChild(a1b1, true)).to.be.true()
      expect(a1b1.containedByParent(root)).to.be.false()
      expect(a1b1.containedByParent(root, true)).to.be.true()
      expect(root.allChildren).to.deep.equal([a1, a2, a1b1])
      expect(
        root
          .asNodeList()
          .map(it => it.name)
          .sort()
      ).to.deep.equal(['a1', 'a1b1', 'a2', 'root'])
      expect(root.asNodeMapByProperty('id')).to.deep.equal({
        [root.id]: root,
        [a1.id]: a1,
        [a2.id]: a2,
        [a1b1.id]: a1b1
      })

      expect(root.asNodeList(it => it.name).sort()).to.deep.equal([
        'a1',
        'a1b1',
        'a2',
        'root'
      ])

      expect(() => root.removeChild(root)).to.throw(IllegalArgumentError)
      expect(() => root.removeChild(a1b1)).to.throw(IllegalArgumentError)
      expect(root.removeChild(a2)).to.equal(root)
      expect(root.childCount).to.equal(1)
      expect(root.children[0]).to.equal(a1)

      root.removeChild(a1)
      expect(a1.parent).not.to.be.ok()
      expect(root.children.includes(a1)).to.be.false()

      class NotNode {}

      expect(() => root.addChild(new NotNode())).to.throw(IllegalArgumentError)
      expect(() => {
        root.setParent(new NotNode())
      }).to.throw(IllegalArgumentError)
    }
  })
})
