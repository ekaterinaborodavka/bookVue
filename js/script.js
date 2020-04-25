'use strict';

Vue.component('book',{
    props:['data'],
    methods:{
        change_book: function(){
            this.$emit('change_book');
        }
    },
    template:`
    <li class="book_item">
        <div class="number">{{data.number}}</div>
        <div class="book_title">
            <div class="book_name">{{data.bookName}}</div>
            <div class="book_author">{{"From " + data.author}}</div>
        </div>
        <div class="book_info">
            <div class="book_friend">{{data.friend}}</div>
            <div class="book_until">{{"Until: " + data.until}}</div>
        </div>
        <button class="book_button" @click="change_book()">
            <img src="img/menu.png" alt="" class="button_img">
        </button>
    </li>
`
})


var app = new Vue({
    el: '#app',
    data: {
    showModal:false,
    showCheckbox:false,
    checkbox:'',
    index:'',
    new_book:{
            bookName:'',
            author:'',
            friend:'',
            until:'',
            number: 1
        },
    books:[]
    },
    methods:{
        showModalWindow(){
            app.reset_book();
            app.showCheckbox = false;
            app.showModal = true;
            app.index = '';
        },
        cancelModal(){
            app.showModal = false;
            app.showCheckbox = false;
            app.reset_book();
            app.checkbox = false;
        },
        reset_book(){
            this.new_book.bookName ='';
            this.new_book.author ='';
            this.new_book.friend ='';
            this.new_book.until ='';
        },
        add_book(){
            if(this.new_book.bookName&&this.new_book.author&&this.new_book.friend&&this.new_book.until&&!app.checkbox&&app.index===''){
                this.books.push({
                    bookName: this.new_book.bookName,
                    author: this.new_book.author,
                    friend: this.new_book.friend,
                    until: this.new_book.until,
                    number: this.new_book.number++
                });
                app.reset_book();
            }else if(app.checkbox){
                app.delete_book();
                app.reset_book();
                app.checkbox = false;
            }else if(app.index>=0){
                this.books[app.index].bookName = this.new_book.bookName;
                this.books[app.index].author = this.new_book.author;
                this.books[app.index].friend = this.new_book.friend;
                this.books[app.index].until = this.new_book.until;
                            }
            app.showModal = false;
        },
        delete_book(index){
            this.books.splice(index,1);
            app.new_book.number--;
            let num = document.querySelectorAll('.number'),
                changeNum = 1;
            for(let i=0; i<num.length; i++){
                num[i].innerHTML = changeNum;
                changeNum++;
            }
            app.number=1
        },
        showChangeModal(index){
            app.index = index;
            app.showCheckbox = true;
            app.showModal = true;
            this.new_book.bookName = this.books[index].bookName;
            this.new_book.author = this.books[index].author;
            this.new_book.friend = this.books[index].friend;
            this.new_book.until = this.books[index].until;
        }
    }
});
