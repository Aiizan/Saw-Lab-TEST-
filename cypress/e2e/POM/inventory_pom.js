//create selectors for inventory page

class Inventory {
    selector = {
        Logo: ()=> cy.get('.app_logo'),
        appTitle: ()=> cy.get('[data-test="title"]'),
        shoppingCart: ()=> cy.get ('[data-test="shopping-cart-link"]'),
        burgerbttn: ()=> cy.get('#react-burger-menu-btn'),
        sortingPicklist: () => cy.get('[data-test="product-sort-container"]'),
        sidebar: {
            menuwrap: ()=> cy.get('.bm-menu-wrap'),
            sidebarAllItems: ()=> cy.get('#inventory_sidebar_link'),
            sidebarAbout: ()=> cy.get('#about_sidebar_link'),
            sidebarLogout: ()=> cy.get('#logout_sidebar_link'),
            sidebarResetAppState:()=> cy.get('#reset_sidebar_link'),
            buttonclose: ()=> cy.get('#react-burger-cross-btn')
        },
        item:{
            itemElement: ()=> cy.get('.inventory_item_description'),
            img: ()=> cy.get ('.inventory_item_img'),
            name: ()=> cy.get('[data-test="inventory-item-name"]'),
            description: ()=> cy.get('[data-test="inventory-item-desc"]'),
            price: ()=> cy.get('[data-test="inventory-item-price"]'),
            //call de function in commands.js 
            addToCart: () => cy.getElementByDataTestLike('add-to-cart'),
            
        }
    };

        //sorting list pendient 

        commands = {
            sortCases: ()=> {
                cy.fixture('sortCases').then(sortCases => {
                    sortCases.forEach(({ option, selector, type, order }) => {
                        cy.get('[data-test="product-sort-container"]').select(option)
              
                      cy.get(selector).then($els => {
                        const values = [...$els].map(el => {
                          const text = el.innerText.trim() 
                          return type === 'price' ? parseFloat(text.replace('$', '')) : text
                        })
              
                        const sorted = [...values].sort((a, b) => {
                          if (type === 'text') {
                            return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
                          } else {
                            return order === 'asc' ? a - b : b - a
                          }
                        })
              
                        expect(values).to.deep.equal(sorted)
                      })
                    })
                  })
                
            }
        }
        

}
export default new Inventory()