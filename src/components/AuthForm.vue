<template>
  <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" @submit="onSubmit" class="flex flex-column gap-2 w-full sm:w-56">
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputText name="username" type="text"  fluid />
        <label class="text-xs" for="username">Логин</label>
      </FloatLabel>
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <Password  name="password" :feedback="false" toggleMask fluid />
        <label for="password" class="text-xs">Пароль</label>
      </FloatLabel>
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
    </div>
    <div class="flex flex-column mt-4">
      <Button type="submit" label="Submit" severity="primary" />
    </div>
  </Form>
</template>

<script setup lang="ts">
  import { Form } from "@primevue/forms";
  import InputText from "primevue/inputtext";
  import Password from 'primevue/password';
  import Message from "primevue/message";
  import Button from "primevue/button";
  import FloatLabel from "primevue/floatlabel";

  import { ref } from 'vue'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import { z } from 'zod'
  import { useToast } from 'primevue/usetoast'

  interface initialValuesProps {
    username: string
    password: string
  }

  const toast = useToast();
  const initialValues   = ref<initialValuesProps>({
    username: '',
    password: ''
  });

  const resolver = ref(zodResolver(
    z.object({
      username: z
        .string()
        .min(3, { message: 'Введите минимум 3 символа' }),
        // .max(20, { message: 'Maximum 20 characters.' }),
      password: z
        .string()
        .min(3, { message: 'Пароль должен содержать не меньше 6 символов' })

        // .refine((value) => /[a-z]/.test(value), {
        //   message: 'Пароль должен содержать строчные буквы'
        // })
        // .refine((value) => /[A-Z]/.test(value), {
        //   message: 'Пароль должен содержать заглавные буквы'
        // })
        // .refine((value) => /d/.test(value), {
        //   message: 'Пароль должен содержать цифры'
        // })
    })
  ));

  const onSubmit = ({ valid }: {valid: boolean}) => {
    if (valid) {
      toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
  };
</script>

<style>
</style>
