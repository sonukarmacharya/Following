class Search{

 searchSalesPerson(items,search){
   let s= items.filter((items) =>
   items.S_Username &&  items.S_Username.toLowerCase().includes(search.toLowerCase()))

    return s
  
 }
 searchCustomer(items,search){
    let s= items.filter((items) =>
    items.Co_Name &&  items.Co_Name.toLowerCase().includes(search.toLowerCase()))
 
     return s
   
  }
  searchProduct(items,search){
    let s= items.filter((items) =>
    items.P_Name &&  items.P_Name.toLowerCase().includes(search.toLowerCase()))
 
     return s
   
  }
}

export default new Search()