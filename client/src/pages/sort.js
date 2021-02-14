class Sort{
    ascSales(salesperson){
       let as=  salesperson.sort((a, b) =>
       a?.S_Username.toLowerCase() < b?.S_Username.toLowerCase() && -1
             )
        return as
    }
    descSales(salesperson){
        let de = salesperson.sort((a, b) => a?.S_Id - b?.S_Id ) 
        return de
    }

    ascCust(customer){
        let as=customer.sort((a, b) =>
        a?.C_Name < b?.C_Name && -1
              )
         return as
     }
     descCust(customer){
         let de = customer.sort((a, b) => a?.C_Id - b?.C_Id ) 
         return de
     }

     ascProduct(product){
        let as=product.sort((a, b) =>
        a?.P_Name < b?.P_Name && -1
              )
         return as
     }
     descProduct(product){
         let de = product.sort((a, b) => a?.P_Id - b?.P_Id ) 
         return de
     }
 
}

export default new Sort()