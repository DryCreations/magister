import HelloWorld from './HelloWorld.svelte';

// This default export determines where your story goes in the story list
export default {
  title: 'HelloWorld',
  component: HelloWorld,
};

const Template = (args) => ({
  Component: HelloWorld,
  props: args,
});

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};