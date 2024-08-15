<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >

      <v-row class="">
        <v-col cols="6">
          <v-card

            class="py-4"
            color="surface-variant"
            href="/home"
            prepend-icon="mdi-account"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            title="User CRUD"
            variant="text"
          >

            <div class="ml-3">This mockup piece corresponds to the CRUD of users interacting with the backend API. Allows uploading files per record.</div>
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card

            class="py-4"
            color="surface-variant"
            href="/fileMan"
            prepend-icon="mdi-folder"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            title="File Manager"
            variant="text"
          >
          <div class="ml-3">
            File Manager
            This piece of mockup corresponds to a component that represents a CRUD of a file and directory structure.
            The source file is in the project assets
          </div>
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>



      </v-row>
      <div class="py-3" ></div>
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.png"
      />



    </v-responsive>
  </v-container>
</template>

<script setup>
  //
</script>
