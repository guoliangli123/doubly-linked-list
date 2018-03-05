const length = Symbol('dbLink-length');

class Node {
  constructor(element) {
    this.element = element;
    this.prev = this.next = null;
  }
}

class dbLink {
  constructor(elementList) {
    this.head = this.tail = null;
    elementList.forEach((element, index) => {
      this.append(element);
    });
    this[length] = elementList.length || 0;
  }

  append(element) {
    let node = new Node(element);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current
      this.tail = node;
    }
    else {
      this.head = node;
      this.tail = node;
    }
    this[length] += 1;
    return true;
  }

  insert(position, element) {
    if (position < 0 || position >= this[length]) return false;
    let node = new Node(element);
    let current, index = 0;
    if (position === 0) {
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        current = this.head;
        node.next = current;
        current.prev = node;
        head = node;
      }
    }
    else if (position === this[length]) {
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    } else {
      current = this.head;
      while (index++ < position) {
        current = current.next;
      }
      node.next = current;
      current.prev.next = node;
      current.prev = node;
      node.prev = current.prev;
    }
    this[length] += 1;
    return true;
  }

  removeAt(position) {
    let index = 0, current;
    if (this[length] == 0) return false;
    if (position < 0 || position >= this[length]) return false;
    if (position === 0) {
      current = this.head;
      this.head = this.head.next;
      if (this[length] === 1) {
        this.tail = null;
      } else {
        this.head.prev = null;
      }
    } else if (position === this[length] - 1) {
      current = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      current = this.head;
      while (index++ < position) {
        current = current.next;
      }
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }
    this[length] -= 1;
    let ele = current.element;
    current = null;
    return ele;
  }

  remove(element) {
    return this.removeAt(this.indexOf(element))
  }

  indexOf(element) {
    let current = this.head;
    let index = -1;
    while (current) {
      index++;
      if (current.element === element) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this[length] === 0;
  }

  get size() {
    return this[length];
  }

  traverse() {
    if (!this.head) {
      return null;
    }
    else {
      let res = this.head.element, current = this.head;
      while (current.next) {
        current = current.next;
        res += '->' + current.element;
      }
      return res;
    }
  }

  free() {
    this.head = this.tail = null;
    this[length] = 0;
  }
}

module.exports = dbLink;