<template>
    <div class="grid-view" ref="gridView">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GridView",
        props: {
            cols: {
                type: Number,
                default: 2
            },
            hMargin: {
                type: Number,
                default: 8
            },
            vMargin: {
                type: Number,
                default: 8
            },
            itemSpace: {
                type: Number,
                default: 8
            },
            lineSpace: {
                type: Number,
                default: 8
            },
        },
        mounted() {
            setTimeout(this._autoLayout, 20)
        },
        updated() {
            this._autoLayout()
        },
        methods: {
            _autoLayout() {
                // 1. 获取gridE1和children
                let gridE1 = this.$refs.gridView
                let children = gridE1.children

                // 2. 设置gridE1的内边距
                gridE1.style.padding = `${this.vMargin}px ${this.hMargin}px`

                // 3. 计算item的宽度
                let itemWidth = (gridE1.clientWidth - 2 * this.hMargin - (this.cols - 1) * this.itemSpace) / this.cols
                for (let i = 0; i < children.length; i++) {
                    let item = children[i];
                    item.style.width = itemWidth + 'px'
                    if ((i + 1) % this.cols !== 0)
                        item.style.marginRight = this.itemSpace + 'px'
                    if (i >= this.cols)
                        item.style.marginTop = this.lineSpace + 'px'
                }
            }
        }
    }
</script>

<style scoped>
    .grid-view {
        display: flex;
        flex-wrap: wrap;
    }
</style>