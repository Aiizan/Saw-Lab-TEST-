import cart_pom from "./cart_pom";

class checkout {
     selector = {
         title : ()=> cy.get('[data-test="title"]'),
         firstname: ()=> cy.get('#first-name'),
         lastname: ()=> cy.get('#last-name'),
         zip: ()=> cy.get('#postal-code'),
         error: ()=> cy.get('[data-test="error"]'),
         errorbttn: ()=> cy.get('[data-test="error-button"]'),
         cancelbttn: ()=> cy.get('#cancel'),
         continuebttn: ()=> cy.get('#continue'),

     };

     selectortwo = {
            paymentinfo : ()=> cy.get('[data-test="payment-info-label"]'),
            infotext: ()=>  cy.get('[data-test="payment-info-value"]'),
            shippinginfo: ()=> cy.get('[data-test="shipping-info-label"]'),  
            infoshipping: ()=> cy.get('[data-test="shipping-info-value"]'),
            totalinfo: ()=> cy.get('[data-test="total-info-label"]'),
            itemtotal:()=> cy.get('[data-test="subtotal-label"]'),
            tax :() => cy.get('[data-test="tax-label"]'),
            total:()=> cy.get('[data-test="total-label"]'),

     };

     commands ={

        error: (msg) =>{
            this.selector.error().should('be.visible').and('have.text',msg);
            this.selector.errorbttn().should('be.visible').click();
            this.selector.errorbttn().should('not.exist');
     },

        pricetotal: () => {
            let total = 0;
            cart_pom.selector.item.price().each(($element) => {
            const pricetext= $element.text().replace('$', '')
            const price = parseFloat(pricetext)
            total += price  
            cy.log(total)   
            }).then(()=> {
                this.selectortwo.itemtotal().invoke('text').then((subTotal)=> {
                    const subtotalvalue = parseFloat(subTotal.replace('Item total: $', ''))
                    expect(total).to.eq(subtotalvalue)
                })
            }).then(()=>{
                this.selectortwo.tax().invoke('text').then((tax)=> {
                    const taxvalue = parseFloat (tax.replace('Tax: $', ''))
                    total += taxvalue
                    cy.log (total)
                this.selectortwo.total().invoke('text').then((totalprice)=> {
                    const pricetotal = parseFloat (totalprice.replace('Total: $', ''))
                    expect(total).to.eq(pricetotal)
                })
                })
            })
        }

    }
}

export default new checkout ()