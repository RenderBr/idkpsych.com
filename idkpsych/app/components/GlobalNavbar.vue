<template>
    <div class="bg-gradient-to-b from-bg to-primary/20 p-4 rounded-2xl shadow-lg select-none sm:flex flex-row justify-between">
        <NuxtLink to="/">
            <div>
                <h1 class="text-4xl text-primary text-shadow-lg tracking-tighter font-bold font-mono">
                    idkpsych.com
                </h1>

                <p class="tracking-wider">
                    i pretend to know about psychology. and i decided to make a website about it.
                </p>
            </div>
        </NuxtLink>


        <div>
            <ul class="flex flex-col gap-1 sm:text-right sm:mt-0 mt-5">
                <li>
                    <NuxtLink to="/stream" class="text-primary hover:underline underline sm:no-underline">stream of consciousness</NuxtLink>
                </li>

                <li>
                    <NuxtLink to="/streams/" class="text-primary hover:underline underline sm:no-underline">ideas</NuxtLink>
                </li>

                <li>
                    <NuxtLink to="/experiences/" class="text-primary hover:underline underline sm:no-underline">experiences</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>