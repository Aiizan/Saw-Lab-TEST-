
import loginPom  from "./POM/login-pom"
import inventory_pom from "./POM/inventory_pom"
import cart_pom from "./POM/cart_pom"


describe ('cart test ', ()=> {
    //visit url and login 
    beforeEach (()=> {
        cy.visit('/')
        loginPom.commands.login('standard_user', 'secret_sauce')
        cy.url().should('include','/inventory.html')

        //add two element to cart
        inventory_pom.selector.item.addToCart().eq(0).click()
        inventory_pom.selector.item.addToCart().eq(0).click()
        cart_pom.selector.cartbadge().should('have.text', '2')
         
    })

 
 

    it ('items completeness', ()=> {
        
        cart_pom.selector.cartIcon().click()

        cart_pom.selector.burgerbttn().should('be.visible')
        cart_pom.selector.title().should('have.text', 'Your Cart')
        cart_pom.selector.qty().should('be.visible').and('have.text', 'QTY')
        cart_pom.selector.description().should('be.visible').and('have.text', 'Description')
        cart_pom.selector.shoppingbttn().should('be.visible').and('have.text', 'Continue Shopping')
        cart_pom.selector.checkoutbttn().should('be.visible').and('have.text', 'Checkout')


        //items 
        
        cart_pom.selector.item.cartitem().should('have.length',2 )
        cart_pom.selector.item.cartquantity().should('be.visible').and('have.length', 2)
        cart_pom.selector.item.title().should('not.empty')
        cart_pom.selector.item.invdescription().should('not.empty').and('be.visible')
        cart_pom.selector.item.price().should('be.visible').and('contain.text', '$')
        cart_pom.selector.item.removebttn().should('be.visible')

    })

    it ('delete one element',()=> {
        //Verify that there are two items before deleting one 
        cart_pom.selector.cartIcon().click()
        cart_pom.selector.item.cartitem().should('have.length', 2)
        cart_pom.selector.item.removebttn().eq(0).click()
        cart_pom.selector.item.cartitem().should('have.length', 1)
        cart_pom.selector.cartbadge().should('have.text', '1')

    })

    it ('Product Persistence', ()=> {
        cart_pom.selector.cartIcon().click()
        cart_pom.selector.item.cartitem().should('have.length', 2)
        cart_pom.selector.item.removebttn().eq(0).click()
        cart_pom.selector.item.cartitem().should('have.length', 1)
        cart_pom.selector.cartbadge().should('have.text', '1')
        //go back to inventory.html
        cart_pom.selector.shoppingbttn().click()
        //go back to cart
        cart_pom.selector.cartIcon().click()
        cart_pom.selector.cartbadge().should('have.text', '1')

    })

    it ('checkout bttn', ()=> {
        cart_pom.selector.cartIcon().click()
        cart_pom.selector.checkoutbttn().click()
        cy.url().should('contain', 'checkout-step-one.html')
    })
})