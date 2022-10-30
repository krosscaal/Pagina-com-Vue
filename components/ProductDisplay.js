app.component('product-display',{
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img v-bind:src="imagem" alt="Sem Foto">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="estoque > 0">Em estoque</p>
                <p v-else>Sem estoque</p>
                <p v-if="estoque > 10">{{estoque}}</p>
                <p v-else-if="estoque<= 10 && estoque > 0">{{estoque}} <span>últimas unidades</span></p>
                <p v-else>{{estoque}}</p>

                <p>Frete: {{frete}}</p>
                <p>Contém:</p>
                <ul>
                    <li v-for="detalhe in detalhes">{{detalhe}}</li>
                </ul>
                <div class="menu-cestas">
                    <h4>Clique sua opção:</h4>
                    <div v-for="(cesta, index) in cestas" 
                        :key="cesta.id" 
                        @mouseover="updateIndex(index)" 
                        class="menu-cestas-item" 
                        :style="{backgroundColor:cesta.color}">
                            <a class="menu-cestas-item a"> {{cesta.prod}}</a>
                    </div>
                </div>
                <button class="button" 
                    :class="{disabledButton: !inEstoque}" 
                    :disabled="!inEstoque" 
                    v-on:click="addToCart">Adicionar ao <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
        

    </div>`,
    data() {
        return {
            fantasia: "Lily's Mimos",
            produto: 'Beer Cestas',
            selectIndex: 0,
            detalhes: [
                '4 long neck'
                ,'1 kit kat'
                ,'1 salaminho'
                ,'1 salgadinho apimentado'
                ,'1 pacote de amendoim'
                ,'1 pacote Bis'
                ,'1 pacote batata chips'
            ],
            cestas: [
                 {id: 1, prod: 'Heineken ', imagem: './assets/images/heineken.jpg', preco: 130, qtd: 8, color: 'green'}
                ,{id: 2, prod: 'Budweiser', imagem: './assets/images/budweiser.jpg', preco: 110, qtd: 0, color: 'red'}
                ,{id: 3, prod: 'Stella   ', imagem: './assets/images/stella.jpg', preco:120, qtd: 11, color: 'white'}
            ],
            reviews: []

        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart')
        },
        updateImage(cestaImagem){
            this.imagem = cestaImagem

        },
        updateIndex(index){
            this.selectIndex = index
            console.log(index)
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title(){
            return this.fantasia+" "+this.produto
        },
        imagem(){
            return this.cestas[this.selectIndex].imagem
        },
        estoque(){
            return this.cestas[this.selectIndex].qtd
        },
        inEstoque(){
            return this.cestas[this.selectIndex].qtd
        },
        frete(){
            if(this.premium){
                return 'Gratis'
            }
            return 'R$ 15.00'
        }
    }
})