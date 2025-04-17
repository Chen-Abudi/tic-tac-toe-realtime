import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Join Room",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Cancel",
    variant: "secondary",
  },
};

export const Error: Story = {
  args: {
    children: "Delete",
    variant: "error",
  },
};
