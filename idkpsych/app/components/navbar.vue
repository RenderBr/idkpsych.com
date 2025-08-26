<template>
    <div class="bg-gradient-to-b from-bg to-primary/20 p-4 rounded-2xl shadow-lg select-none flex justify-between">
        <NuxtLink to="/">
            <div>
                <h1 class="text-4xl text-primary text-shadow-secondary tracking-tighter font-bold font-mono">
                    idkpsych.com
                </h1>

                <p class="tracking-wider">
                    i pretend to know about psychology. and i decided to make a website about it.
                </p>
            </div>
        </NuxtLink>


        <div>
            <ul class="flex flex-col gap-1 text-right">
                <li>
                    <NuxtLink to="/stream" class="text-primary hover:underline">stream of consciousness</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>