'use strict'
const assert = require('assert');
const dbLink = require('../');
const DATA = [1, 2, 3, 4, 5, 6];

describe('inked_list', function () {
  it('should generate a dblink', function () {
    const dbLinkIns = new dbLink(DATA);
    assert.equal(dbLinkIns.size, DATA.length)
    assert.equal(dbLinkIns.head.next, dbLinkIns.head.next.next.prev)
  })

  it('should append a new node', function () {
    const dbLinkIns = new dbLink(DATA);
    dbLinkIns.append(7);
    assert.equal(dbLinkIns.size, DATA.length + 1);
    assert.equal(dbLinkIns.tail.element, 7);
    assert.equal(dbLinkIns.tail.prev.element, 6);
  })

  it('shoud insert a new node', function () {
    const dbLinkIns = new dbLink(DATA);
    dbLinkIns.insert(1,7);
    assert.equal(dbLinkIns.size, DATA.length + 1);
    assert.equal(dbLinkIns.head.next.element, 7);
  })

  it('shoud remove a node', function () {
    const dbLinkIns = new dbLink(DATA);
    dbLinkIns.removeAt(0);
    assert.equal(dbLinkIns.size, DATA.length - 1);
    assert.equal(dbLinkIns.head.element, 2);
    dbLinkIns.remove(6);
    assert.equal(dbLinkIns.size, DATA.length - 2);
    assert.equal(dbLinkIns.tail.element, 5);
  })

  it('shoud free the link', function () {
    const dbLinkIns = new dbLink(DATA);
    dbLinkIns.free();
    assert.equal(dbLinkIns.size, 0);
  })
  
  it('shoud console the dbLinks', function () {
    const dbLinkIns = new dbLink(DATA);
    assert.equal(dbLinkIns.traverse(), '1->2->3->4->5->6');
  })
})