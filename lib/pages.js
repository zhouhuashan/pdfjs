var PDFArray = require('./datatypes/array')
  , Page = require('./page')

var Pages = module.exports = function(document) {
  this.document = document
  this.tree     = this.document.createObject('Pages')
  this.kids     = new PDFArray()

  this.tree.addProperty('MediaBox', new PDFArray([0, 0, document.width, document.height]))
  this.tree.addProperty('Kids',  this.kids)
  this.tree.addProperty('Count', this.count)
}

Object.defineProperty(Pages.prototype, 'count', {
  get: function() {
    return this.kids.length
  }
})

Pages.prototype.addPage = function() {
  var page = new Page(this.document, this.tree)

  this.kids.push(page.toReference())
  this.tree.addProperty('Count', this.count)
  
  return page
}

Pages.prototype.toReference = function() {
  return this.tree.toReference()
}