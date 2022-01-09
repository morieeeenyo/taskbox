import Task from './Task.vue';

import { action } from '@storybook/addon-actions';

export default {
  component: Task, // storybookで表示するコンポーネント
  excludeStories: /.*Data$/, // これに当てはまるものはstorybookには含めない
  title: 'Task', // 表示名
  // Templateでargとして渡す関係でargTypeとして指定している？？
  argTypes: {
    onPinTask: {},
    onArchiveTask: {},
  },
};

// Dataって入ってるのでstorybookには含まれない
// ここに書いたやつがeventに登録される
export const actionsData = {
  onPinTask: action('pin-task'),
  onArchiveTask: action('archive-task'),
};

// ここに書いたコンポーネントがstorybookで見た目として表示される
const Template = args => ({
  components: { Task },
  setup() {
    return { args, ...actionsData };
  },
  template: '<Task v-bind="args" />', // argsに入っている値がコンポーネントのpropsに渡される
});

// storubookのメインの状態として紹介される
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

// stories以下に記述される。コンポーネントの状態変化ごとに記述する
// ピン留めされた状態
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED', // stateだけかえる
  },
};

// アーカイブされた状態
export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED', // stateだけかえる
  },
};