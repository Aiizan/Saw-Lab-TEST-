import inventory_pom from "./POM/inventory_pom";
import loginPom from "./POM/login-pom";

describe ('inventory test', ()=> {
    //first visit url and login 
    beforeEach(()=>{
        cy.visit('/')
        loginPom.commands.login('standard_user', 'secret_sauce')
        cy.url().should('include','/inventory.html')
    })

    it ('Check all element of page be visible', ()=> {
        inventory_pom.selector.Logo().should('have.text', 'Swag Labs');
        inventory_pom.selector.appTitle().should('have.text', 'Products');
        inventory_pom.selector.burgerbttn().should('be.visible');
        inventory_pom.selector.shoppingCart().should('be.visible');
        inventory_pom.selector.sortingPicklist().should('be.visible');
        inventory_pom.selector.sidebar.menuwrap().should('not.be.visible');
    })

    it ('Check all items be visible', ()=> {
        inventory_pom.selector.item.itemElement().each(($item)=> expect($item).to.be.visible)
        inventory_pom.selector.item.name().each(($name)=> expect($name).to.not.be.empty)
        inventory_pom.selector.item.description().each(($desc)=> expect($desc).to.not.be.empty)
        inventory_pom.selector.item.img().each(($img)=> expect($img).to.be.visible)
        inventory_pom.selector.item.addToCart().each(($cart)=> expect($cart).to.have.text('Add to cart'))
    })

    

    it('Sidebar check', ()=> {
        inventory_pom.selector.burgerbttn().click()
        inventory_pom.selector.sidebar.menuwrap().should('be.visible')
        inventory_pom.selector.sidebar.sidebarAbout().should('be.visible').and('have.text', 'About')
        inventory_pom.selector.sidebar.sidebarAllItems().should('be.visible').and('have.text', 'All Items')
        inventory_pom.selector.sidebar.sidebarLogout().should('be.visible').and('have.text', 'Logout')
        inventory_pom.selector.sidebar.sidebarResetAppState().should('be.visible').and('have.text', 'Reset App State')
        inventory_pom.selector.sidebar.buttonclose().click()
        inventory_pom.selector.sidebar.menuwrap().should('not.be.visible')
    })

    it('Sorting Pick Check', ()=> {
        inventory_pom.commands.sortCases()
    })
   
})