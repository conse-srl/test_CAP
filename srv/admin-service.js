const cds = require('@sap/cds')

// module.exports = class AdminService extends cds.ApplicationService { init(){

//   const { Books } = this.entities

//   /**
//    * Generate IDs for new Books drafts
//    */
//   this.before ('NEW', Books.drafts, async (req) => {
//     if (req.data.ID) return
//     const { ID:id1 } = await SELECT.one.from(Books).columns('max(ID) as ID')
//     const { ID:id2 } = await SELECT.one.from(Books.drafts).columns('max(ID) as ID')
//     req.data.ID = Math.max(id1||0, id2||0) + 1
//   })
//   return super.init()
// }}

module.exports = cds.service.impl(async function () {
this.on("takeAuthors", async ()=>{
    const { Authors } = cds.entities("sap.capire.bookshop");
    var aSessions = await cds.run(SELECT.from(Authors));
return aSessions;

} );
this.on("booksCount", async ()=>{ 
    const { Books } = cds.entities("sap.capire.bookshop");

    var aBooks = await cds.run(SELECT.from(Books));
    return aBooks.length;});
});