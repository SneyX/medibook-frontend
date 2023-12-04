<template>
    <div class="redes">
        <a @click.prevent="share(facebook)"><img src="../assets/facebook.png" alt="Logo de Facebook" /></a>
        <a @click.prevent="share(twitter)"><img class="tw" src="../assets/LogoX.svg" alt="Logo de Facebook" /></a>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                providers: {
                    twitter: 'https://twitter.com/intent/tweet/?url=:url&text=:text',
                    facebook: 'https://www.facebook.com/sharer/sharer.php?u=:u&title=:title'
                }
            };
        },

        methods: {
            share(providerUrl) {
                window.open(providerUrl, 'sharer', 'toolbar=0,status=0,width=648,height=395');
                return true;
            }
        },

        computed: {
            facebook() {
                return this.providers.facebook.replace(':u', this.url).replace(':title', this.text);
            },
            twitter() {
                return this.providers.twitter.replace(':url', this.url).replace(':text', this.text);
            }
        }
    }
</script>
<style scoped>
.redes a:first-child img{
    filter: brightness(0) saturate(100%) invert(30%) sepia(99%) saturate(419%) hue-rotate(134deg) brightness(95%) contrast(90%);
width: 3vw;
margin-bottom: 4px;
}
.tw {
    width: 6vw;
}
.redes{
    margin-left: 30px;
}
@media only screen and (max-width:480px ){
    .redes a:first-child img{
width: 10vw;
margin: 0px 0px 2px 0px;
}
.tw {
    width: 20vw;
    margin: 0px;
}

}
</style>
