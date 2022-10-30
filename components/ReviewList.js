app.component('review-list',{
    props:{
        reviews:{
            type: Array,
            required: true
        }
    },
    template:
    /*html */
    `
    <div class="review-container">
        <h3>Reviews:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{review.name}} deu avaliação {{review.rating}} estrelas
                <br/>
                "{{ review.review }}"
            </li>
        </ul>
    </div>
    `
})