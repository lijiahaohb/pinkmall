<template>
    <div class="cart-bottom-bar">
        <div class="check-area">
            <check-button class="check-button" :isChecked="isAllSelected" @click.native="allSelectedClick">
            </check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计: {{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算 ({{checkedLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from "@/components/content/checkButton/CheckButton"
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            totalPrice() {
                return "￥" + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkedLength() {
                return this.$store.state.cartList.filter(item => {
                    return item.checked
                }).length
            },
            isAllSelected() {
                // return this.$store.state.cartList.filter(item => {
                //     return !item.checked
                // }).length === 0
                if (this.$store.state.cartList.length == 0) return false
                return !this.$store.state.cartList.find(item => !item.checked)
            }
        },
        methods: {
            allSelectedClick() {
                if (this.isAllSelected) {
                    this.$store.state.cartList.forEach(element => {
                        element.checked = false
                    });
                } else {
                    this.$store.state.cartList.forEach(item => item.cheked = true)
                }
            },
            calcClick() {
                if (this.checkedLength == 0) {
                    this.$toast.show("请选择购买的商品", 2000)
                }
            }
        }
    }
</script>

<style scoped>
    .cart-bottom-bar {
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;

        background-color: #eee;

    }

    .check-area {
        display: flex;
        align-items: center;
        width: 90px;
    }

    .check-button {
        line-height: 20px;
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }

    .price {
        flex: 1;
        margin-left: 30px;
    }

    .calculate {
        width: 90px;
        text-align: center;
        background-color: var(--color-tint);
        color: #fff;
    }
</style>