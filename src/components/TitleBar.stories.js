import TitleBar from './TitleBar.svelte';

// This default export determines where your story goes in the story list
export default {
  title: 'Title Bar',
  component: TitleBar,
};

const Template = (args) => ({
  Component: TitleBar,
  props: args,
});

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};