<template>
    <div>
        <Navbar />
        <div class="shadow-sm shadow-primary rounded-2xl mt-4">
            <slot />
        </div>
    </div>
</template>

<style lang="css" scoped>
div {
    padding: 2rem;
}
</style>