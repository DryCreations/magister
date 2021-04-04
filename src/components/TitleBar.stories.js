import TitleBar from './TitleBar.svelte';

// This default export determines where your story goes in the story list
export default {
  title: 'Components/Title Bar',
  component: TitleBar,
};

const Template = (args) => ({
  Component: TitleBar,
  props: args,
});

export const Maximized = Template.bind({});

export const Unmaximized = Template.bind({});

Maximized.args = {
  isMax: true,
};

Unmaximized.args = {
    isMax: false,
};