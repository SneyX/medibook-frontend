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
.redes {
  position: relative;
}
.redes a:first-child img{
    filter: brightness(0) saturate(100%) invert(30%) sepia(99%) saturate(419%) hue-rotate(134deg) brightness(95%) contrast(90%);
width: 3vw;
position: absolute;
top: -45px;
left: 120px;
}
.tw {
    position: absolute;
    width: 6vw;
    top: -47px;
    left: 160px;
}
.redes{
    margin-left: 30px;
}
@media only screen and (max-width:480px ){
    .redes a:first-child img{
        width: 7dvw;
        top: -50px;
        left: -20px;
    }
.tw {
    width: 14vw;
    margin: 0px;
    top: -51px;
    left: 10px;
}

}
</style>
