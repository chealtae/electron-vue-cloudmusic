<template>
    <div class="player">
        <div id="progressBar">
            <progress-bar></progress-bar>
        </div>
    </div>
</template>
<script>

import ProgressBar from '../Common/ProgressBar.vue'
export default {
    components: {
        ProgressBar,
    }
}
</script>