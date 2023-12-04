<template>
    <div>
        <a @click.prevent="share(facebook)">Share on Facebook</a>
        <a @click.prevent="share(twitter)">Share on Twitter</a>
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
