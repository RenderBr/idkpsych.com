<script lang="ts" setup>
useSeoMeta({
    title: "idkpsych.com - cognitive psychology ramblings",
    description: "a personal psychology blog, where i share my thoughts and findings in my own mental health journey"
})
</script>

<template>
    <div>
        <h2 class="text-primary text-3xl tracking-wider font-bold">
            welcome
        </h2>

        <hr class="text-primary/20 my-1" />

        <p class="max-w-[90ch]">
            hi, my name is julian seitz. i am a student of software development, and a psychology hobbyist.
            <br /><br />

            welcome to my psychology website. i hope you find something interesting here.
            <br /><br />
            i like writing about all sorts of stuff. mostly, i enjoy exploring mental health, cognitive science and
            human behavior.
            my writing style is casual, maybe a little unconventional. but i like to think that makes it more
            approachable.
            <br /><br />
            i struggle with anxiety, depression, and addiction (substance abuse). part of why i am interested in
            psychology is to understand myself better, and to help others who might be going through similar challenges.
            <br /><br />
        </p>

        <h3 class="text-red-500/80 text-xl leading-tight">disclaimer:</h3>
        <p class="mb-4 max-w-[90ch]">
            i am not a doctor, therapist, or licensed professional. this website is not a substitute for professional
            help. <strong>if you are struggling with mental health issues, please reach out to a qualified
                professional.</strong>
            <br>
            i'm simply a passionate soul, one that enjoys real connection and understanding.
        </p>

        <div>
            <NuxtImg width="300px" height="100px" src="/img/signature-black.webp" alt="Julian Seitz"
                class="block dark:hidden" fetchpriority="high" preload />
            <NuxtImg width="300px" height="100px" src="/img/signature-white.webp" alt="Julian Seitz"
                class="hidden dark:block" fetchpriority="high" preload />
        </div>
    </div>
</template>