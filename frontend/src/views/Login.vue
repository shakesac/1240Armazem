<template>
<base-layout>
<div id="center-wrapper">
        <div class="p-4">
            <h5 class="text-center pb-3">Iniciar sessão</h5>
            <form v-on:submit.prevent="submit">
                <div class="form-label-group">
                <input v-model="data.email" type="email" id="inputEmail" class="form-control" placeholder="Endereço de email" required autofocus>
                <label for="inputEmail">Endereço de email</label>
                </div>
                <div class="form-label-group">
                <input v-model="data.password" type="password" id="inputPassword" class="form-control" placeholder="Palavra-passe" required>
                <label for="inputPassword">Palavra-passe</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-3 w-100" type="submit">Entrar</button>
                <div class="text-center mt-1">
                    <router-link to="/registo" class="link small">Não tens conta?</router-link>
                </div>
            </form>
        </div>
    </div>
</base-layout>
</template>

<script>
import {computed, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import swal from 'sweetalert2'
import BaseLayout from './Base.vue'
export default {
    name: 'Login',
    components: {
        BaseLayout,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const status = computed(() => store.getters.isLoggedIn)
        const name = computed(() => store.getters.getProfile)
        if (status.value === true) {
            router.push('/painel')
        }
        const data = reactive({
            email: '',
            password: '',
        })
        const submit = async () => {
            await store.dispatch('login', data)
            if (status.value === true) {
                swal.fire({
                    icon: 'success',
                    title: 'Olá ' + name.value.firstName,
                    showConfirmButton: false,
                    timer: 1500
                })
                await router.push('/painel')
            } else {
                document.getElementById('inputPassword').value=''
            }
        }
        return {
            data,
            submit
        }
    },
}
</script>

<style>
#center-wrapper {
  background-color: #f0f3f6;
  width: 100%;
  max-width: 350px;
  border-radius: 20px;
}
    :root {
    --input-padding-x: 1.5rem;
    --input-padding-y: 0.75rem;
    }
    .btn-login {
        font-size: 0.9rem;
        letter-spacing: 0.05rem;
        padding: 0.75rem 1rem;
        border-radius: 2rem;
    }
    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }
    .form-label-group>input,
    .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
        height: auto;
        border-radius: 2rem;
    }
    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group>input,
    .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
        height: auto;
        border-radius: 2rem;
    }

    .form-label-group>label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        margin-bottom: 0;
        /* Override default `<label>` margin */
        line-height: 1.5;
        color: #495057;
        cursor: text;
        /* Match the input under the label */
        border: 1px solid transparent;
        border-radius: .25rem;
        transition: all .1s ease-in-out;
    }

    .form-label-group input::-webkit-input-placeholder {
        color: transparent;
    }

    .form-label-group input:-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-moz-placeholder {
        color: transparent;
    }

    .form-label-group input::placeholder {
        color: transparent;
    }

    .form-label-group input:not(:placeholder-shown) {
        padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
        padding-bottom: calc(var(--input-padding-y) / 3);
    }

    .form-label-group input:not(:placeholder-shown) ~ label {
        padding-top: calc(var(--input-padding-y) / 3);
        padding-bottom: calc(var(--input-padding-y) / 3);
        font-size: 12px;
        color: #777;
    }
</style>