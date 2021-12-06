<template>
    <b-container fluid class="ideas_body">
        <b-tabs>
          <b-tab title="My products" class="mb-10">
            <div class="row blue-row">
              <div class="col-md-6">
                <!-- begin:: Search bar -->
                <form type="post" action="/">
                  <b-input-group id="search-pro">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search Product"
                      autocomplete="off">
                    </b-form-input>
                    <router-link to="/my-products">
                      <b-input-group-append>
                        <b-button variant="outline-success" type="submit"><i class="fa fa-search"></i></b-button>            
                      </b-input-group-append>
                    </router-link>
                  </b-input-group>
                </form>
                <!-- end:: Search bar -->
              </div>
              <div class="col-md-6 text-left">
                <button type="button" class="btn btn-primary blue search-btn" @click="search_pro(filter)"> 
                  <i class="fa fa-search"></i> Start searching </button>
              </div>
            </div>
            <!-- Main table element -->
            <div class="d-flex align-items-center justify-content-between mt-5">
              <b-form-select v-model="selected_action" :options="options" id="select_action"></b-form-select>
              <input type="hidden" id="product_count" :value="totalRows" />
              <p id="product_num" v-if="this.filteredItems.length != 0">{{this.filteredItems.length}} Products </p>
            </div>
            <b-checkbox id="check_all_product" @change="check_all"></b-checkbox><span id="check_label">Choose ALL</span>
            <b-table
              show-empty
              small
              stacked="md"
              selectable
              ref="productTable"
              @row-selected="onRowSelected"
              :items="filteredItems"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
             
              class="table-bordered product-table">
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span class="checkbox" aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span class="checkbox" aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(image)="data">
                <img class="product-img" :src="`media/products/`+data.item['image']"/>
              </template>
              <template #cell(product_name)="data">
                <b-form-input :value="data.item.product_name" class="name-input" no-resize />
              </template>
              <template #cell(apps)="data">
                <b-col class="app_popup">
                  <span :id="`popover-` + data.index">Apps <b-icon icon="box-arrow-up-right" /></span>
                  <b-popover :target="`popover-` + data.index" triggers="hover" placement="bottom">
                    <template v-slot:title>
                      Open product in:
                    </template>
                    <b-row>
                      <b-col xs="6" v-for="(item,i) in apps_product" :key="i">
                        <div class="product-block">
                          <inline-svg class="svg-icon" :src="`media/svg/` + item.icon + `.svg`" />
                          <span>{{item.text}}</span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-popover>
                </b-col>
              </template>
              <template #cell(links)="">
                <div id="product-icons">
                  <div>
                    <b-icon icon="circle" id="circle" />
                    <b-icon icon="link45deg" id="link" />
                  </div>
                  <div id="clipboard"><b-icon icon="clipboard" /></div>
                </div>
              </template>
              <template v-slot:cell(actions)="">
                <b-dropdown text="Actions" offset="50" variant="default">
                  <b-dropdown-item size="sm"> Edit </b-dropdown-item>
                  <b-dropdown-item size="sm"> Delete </b-dropdown-item>
                </b-dropdown>
              </template>              
            </b-table>
            <b-row class="pagination-row">
              <b-col>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="filteredItems.length"
                  :per-page="perPage"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Global database" class="mb-10">
            <div id="database-title">
              <h1>Welcome to the Rounded Global Database</h1>
              <p>Here you can utilise our knowledge and extensive list of products to grow your business.
                <br>Take a look at our suggestions, or immediately start searching below</p>
            </div>
            <div class="blue-row">
              <div class="row">
                <div class="col-md-6">
                  <!-- begin:: Search bar -->
                  <form type="post" action="/">
                    <b-input-group id="search-pro">
                      <b-form-input
                        v-model="category"
                        type="search"
                        placeholder="Search Product"
                        autocomplete="off">
                      </b-form-input>
                      <router-link to="/my-products">
                        <b-input-group-append>
                          <b-button variant="outline-success" type="submit"><i class="fa fa-search"></i></b-button>            
                        </b-input-group-append>
                      </router-link>
                    </b-input-group>
                  </form>
                  <!-- end:: Search bar -->
                </div>
                <div class="col-md-6 text-left">
                  <button type="button" class="btn btn-primary blue search-btn" @click="search_category(category)"> 
                    <i class="fa fa-search"></i> Start searching </button>
                </div>
              </div>
            </div>
            <div id="suggestion-block">
              <div class="text-center">
                <h1>Our suggestions</h1>
              </div>
              <div class="category-block" v-for="index in 3" :key="index">
                <h4>Suggested category</h4>
                <b-row>
                  <b-col lg="3" md="4" sm="6" xs="12" v-for="(item,i) in filteredCategories" :key="i" class="product-block">
                    <p>{{item.name}}</p>
                    <img :src="`media/products/` + item.image">
                    <button class="btn btn-primary"><b-icon icon="plus" /> Add product</button>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-tab>
        </b-tabs>
    </b-container>
</template>

<script>
import $ from 'jquery'
  var tr_length = 0;
  $(document).ready(function(){
    tr_length = $(".product-table tr").length - 1;
    if($(document).width() < 768){
    setTimeout(function(){
      $(".product-table").find("td").attr("data-label","");
    }, 200) 
  }
  $(document).on("click", ".pagination", function(){
    setTimeout(() => {
      tr_length = $(".product-table").find("tr").length - 1;
      $("#check_all_product").prop("checked", false)
      }, 200); 
    })
  });

  export default {
    data() {
        return {
          filteredItems: [],
          items: [
            {
              image: "ipad.jpeg",
              product_name: "AKG EO-IG955 Stereo In-ear headset black for Samsung Galaxy S8 (SM-G950F), Galaxy S8 Plus (SM-G955F)", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "d-link.jpeg",
              product_name: "Samsung Galaxy Gear (SM-V700) back cover orange GH98-30637D", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "light-box.png",
              product_name: "Samsung Galaxy S8 (SM-G950F) Display  unit complete black GH97-20473A GH97-20457A", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "resiba.jpeg",
              product_name: "Nintendo Switch USB-C charing connector", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "ipad.jpeg",
              product_name: "AKG EO-IG955 Stereo In-ear headset black for Samsung Galaxy S8 (SM-G950F), Galaxy S8 Plus (SM-G955F)", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "d-link.jpeg",
              product_name: "Samsung Galaxy Gear (SM-V700) back cover orange GH98-30637D", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "light-box.png",
              product_name: "Samsung Galaxy S8 (SM-G950F) Display  unit complete black GH97-20473A GH97-20457A", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "resiba.jpeg",
              product_name: "Nintendo Switch USB-C charing connector", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "ipad.jpeg",
              product_name: "AKG EO-IG955 Stereo In-ear headset black for Samsung Galaxy S8 (SM-G950F), Galaxy S8 Plus (SM-G955F)", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "d-link.jpeg",
              product_name: "Samsung Galaxy Gear (SM-V700) back cover orange GH98-30637D", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "light-box.png",
              product_name: "Samsung Galaxy S8 (SM-G950F) Display  unit complete black GH97-20473A GH97-20457A", 
              stock: "61", 
              price: "$15.50",
            },
            {
              image: "resiba.jpeg",
              product_name: "Nintendo Switch USB-C charing connector", 
              stock: "61", 
              price: "$15.50",
            },
          ],
          fields: [      
            { key: 'selected', label: '' },          
            { key: 'image', label: 'Image' },
            { key: 'product_name', label: 'Product name' },
            { key: 'stock', label: 'Stock' },
            { key: 'price', label: 'Price' },
            { key: 'apps', label: '' },
            { key: 'actions', label: '' },
            { key: 'links', label: '' }
          ],
          apps_product: [
            { icon: 'orders', text: 'Orders' },
            { icon: 'purchase', text: 'Purchase' },
            { icon: 'inbound', text: 'Inbound' },
            { icon: 'warehouse', text: 'Warehouse' },
            { icon: 'outbound', text: 'Outbound' },
            { icon: 'dashboard', text: 'RMA' },
            { icon: 'products-overview', text: 'Products' },
          ],
          categories:[
            {
              name:"AKG EO-IG955 Stereo In-ear headset black for Samsung Galaxy S8 (SM-G950F), Galaxy S8 Plus (SM-G955F)",
              image: "phone-2.jpg"
            },
            {
              name:"Samsung Galaxy S8 (SM-G950F) Display  unit complete black GH97-20473A GH97-20457A",
              image: "phone-3.jpg"
            },
            {
              name:"AKG EO-IG955 Stereo In-ear headset black for Samsung Galaxy S8 (SM-G950F), Galaxy S8 Plus (SM-G955F)",
              image: "phone-2.jpg"
            },
            {
              name:"Samsung Galaxy S8 (SM-G950F) Display  unit complete black GH97-20473A GH97-20457A",
              image: "phone-3.jpg"
            }
          ],
          filteredCategories: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 10,
          filter: null,
          category: null,
          selected: [],
          currentPageItems: null,
          selected_action: null,
          options: [
            { value: null, text: 'Select action' },
            { value: 'edit', text: 'Edit' },
            { value: 'delete', text: 'Delete' }
          ]
        }
    },
    mounted() {
      //... filter product in my products
      this.filteredItems = this.items;
      this.totalRows = this.filteredItems.length;
      //... filter product category in global database
      this.filteredCategories = this.categories;
      this.currentPageItems = tr_length;
    },
    methods: {
      //... filter product in my products
      search_pro(i){
        i = this.filter ? this.filter.toLowerCase() : "";
        this.filteredItems = this.items.filter(function(e){
          return e.product_name.toLowerCase().includes(i) ;
        })
      },
      //... filter product category in global database
      search_category(i){
        i = this.category ? this.category.toLowerCase() : "";
        this.filteredCategories = this.categories.filter(function(e){
          return e.name.toLowerCase().includes(i) ;
        })
      },
      choose_all_products(which) {
        let productTable = this.$refs.productTable.$el,
        tableBody = productTable.getElementsByTagName('tbody')[0],
        tableRows = tableBody.getElementsByTagName('tr')
        which.forEach(idx => {
          tableRows[idx].click()
        })
      },
      onRowSelected(items) {
        this.selected = items;
      },
      check_all(check_state) {
        console.log(tr_length)
        check_state == false ? this.$refs.productTable.selectAllRows() : this.$refs.productTable.clearSelected();
        var t_row_array = [];
        for(let i=0; i<tr_length; i++){
          t_row_array[i] = i;
        }
        this.choose_all_products(t_row_array);
      }
    }
  }
</script>
<style lang="scss">
  .tabs{
    .nav-tabs{
      border-bottom: none;
      .nav-link {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        padding: 1.2rem 1rem;
        margin-bottom: 0;
        text-align: center;
        height: 100%;
        font-size: 1.2rem;
        background-color: #fff2f2;
        min-width: 200px;
        &.active, &:focus{
          color: #fff;
          background-color: #0089ca;
          border-color: #0089ca;        
        }
        &:hover{
          border-color: #0089ca;
        }
      }
     }
    .tab-content{
      .blue-row{
        background-color: #0089ca;
        padding: 1.5rem;
        color: #fff;
        margin-left: 0; 
        margin-right: 0;
        #search-pro{
          background: white;
          border-radius: 30px;
          input{
            border: none;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            font-size: 12px;
          }
          .input-group-append {
            margin-left: 0;
          }
          .input-group-append .btn {
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            font-size: 12px;
            font-weight: bold;
            border: none;
            &:hover, &:focus{
              background-color: #fff;
            }
            i{
              color: #0089ca;
              line-height: 0;
              font-size: 1.3rem;
            }
          }
        }
        .search-btn{
          border: 1px solid #fff;
          background-color: #0089ca!important;
          padding: 0.65rem 2.6rem;
          border-color: #fff!important;
          &:hover{
            background-color: #fff!important;
            color: #0089ca!important;
            i{
              color: #0089ca!important;
            }
          }
        }
      }
      #product_num{
        font-size: 1.2rem;
        color: #0089ca;
        margin-top: 1rem;
      }
      label[for='check_all_product']::before,
      label[for='check_all_product']::after{
        top: 40px;
        left: -5px;
      }
      .product-table{
        tbody tr{
          &:hover{
            background: powderblue!important;
            cursor: pointer;
          }
        }
        th{
          padding: 1rem 0;
          &:first-child{
            width: 30px;
          }
          &:nth-child(3){
            width: 50%;
          }
          &:hover{
            background: #fff!important;
          }
        }
        td{
          border: none !important;
          padding: 2px 0;
          // text-align: center;
          &:first-child{
            padding: 2px 0.5rem 2px 1rem;
          }
          &:nth-child(6){
            color: #0089ca;
            font-weight: 500;
            padding: 2px 0.2rem;
          }
          .name-input{
            border: none;
            background: transparent;
            color: #0089ca;
            font-size: 1.2rem;
            padding-left: 0;
            width: 100%;
          }
          .product-img{
            height: 50px;
            margin: 0.5rem 0;
          }
          .app_popup{
            cursor: pointer;
          }
          .btn.btn-default{
            color: #0089ca;
            background-color: transparent;
            border: unset;
            font-weight: 500;
            &:hover, &:focus{
              background-color: transparent;
              border: unset;
            }
          }
          #product-icons{
            display: flex;
            align-items: center;
            #circle{
              color: #90ef90;
              background: #90ef90;
              border-radius: 100%;
              font-size: 1rem;
              margin: 2px 4px;
              display: block;
            }
            #link{
              color: #0089ca;
              font-size: 20px;
            }
            #clipboard{
              background-color: #0089ca;
              color: #fff;
              height: 45px;
              vertical-align: middle;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              padding: 0 4px;
              border-radius: 3px;
              margin-left: 5px;
            }
          }
        }
      }
      #database-title{
        background-color: #0089ca;
        color: #fff;
        text-align: center;
        font-size: 1.2rem;
        padding: 3rem 0 2rem;
      }
      #suggestion-block{
        background-color: #fff2f2;
        h1{
          padding: 3rem 0 2rem;
          color: #000;
          font-weight: bold;
        }
        .category-block{
          padding: 1rem 2rem 2rem;
          h4{
            color: #000;
            font-weight: 600;
          }
          .product-block{
            border-radius: 10px;
            padding: 1rem 2rem 2rem;
            position: relative;
            text-align: center;
            background-color: #fff;
            max-width: 23%;
            margin: 1rem 1%;
            box-shadow: 1px 4px 7px 5px #d7d7d7;
            @media (max-width: 992px){
              flex: 0 0 50%;
              max-width: 46%;
              margin: 1rem 2%;
            }
            @media (max-width: 576px){
              flex: 0 0 100%;
              max-width: 90%;
              margin: 1rem 5%;
            }
            p{
              font-size: 1.2rem;
              font-weight: 600;
              color: #0089ca;
              line-height: 1.5em;
              height: 3em;
              overflow: hidden;
              text-align: left;
            }
            img{
              width: 100%;
              display: block;
              margin: auto;
            }
            button{
              bottom: 1rem;
              font-size: 1.1rem;
              position: absolute;
              left: calc(50% - 70px);
              box-shadow: 9px 0px 60px 75px rgb(242 242 245);
            }
          }
        }
      }
    }
    .pagination-row{
      background-color: #fff2f2;
      margin: 3rem 0 0;
      padding-top: 1rem;
    }
  }
  .popover{
    .product-block{
      display: flex;
      align-items: center;
      svg{
        width: 35px;
        margin-right: 10px;
      }
    }
  }
  body #content {
    padding: 0;
  }
  .table-active, .table-active > th, .table-active > td {
    background-color: powderblue!important;
  }
  .checkbox{
    padding: 0px 2px;
    margin-top: 0px;
    display: block;
    border: 1px solid #888;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    font-weight: bold;
    font-size: 9px;
    color: #888;
    margin-right: 5px;
  }
  #check_label{
    display: none;
    margin-bottom: -30px;
    margin-left: 50px;
  }
  .custom-select#select_action{
    width: 150px!important;
    color: #0089ca;
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    .table.b-table.b-table-stacked-md{
      display: table;
    }
    .tabs{
      .nav-tabs .nav-link{
        min-width: unset;
        font-size: 1rem;
      }
      .tab-content{
        .product-table{
          tbody{
            padding-top: 30px;
              tr{
              padding: 1rem 0;
              td{
                display: flex!important;
                align-items: center;
                padding: 5px 0 5px 1.5rem;
                div:first-child {
                  width: 100%!important;
                  #product-icons{
                    div:first-child{
                      width: auto!important;
                    }
                  }
                }
                .app_popup{
                  padding-left: 0;
                  margin: 0.5rem 0;
                }
                &::before{
                  width: unset!important;
                }
                .btn.btn-default{
                  text-align: left;
                }
                &:first-child, &:nth-child(6), &:nth-child(8){
                  padding: 2px 0;
                  &[data-label]::before{
                    width: unset!important;
                    padding: 0 calc(1rem / 2) 0 1.5rem!important;
                  }
                }
                &:nth-child(7){
                  padding: 2px 0 2px 0;
                  &::before{
                    padding: 0 calc(1rem / 2) 0 5px!important;
                  }
                }
              }
            }
          }
          
        }
        label[for='check_all_product']::before,
        label[for='check_all_product']::after{
          top: 21px;
          left: 13px;
        }
        #check_label{
          display: block;
        }
      }
      .blue-row .text-left{
        text-align: center!important;
        .search-btn{
          margin-top: 1rem;
        }
      }
    }
  }
</style>