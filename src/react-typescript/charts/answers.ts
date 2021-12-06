import {StudioTemplateProperty} from "@haulmont/jmix-front-generator/lib/common/studio/studio-model";
import {
  createComponentNameQuestion,
  ComponentNameAnswer,
  menuItemQuestion,
  MenuItemAnswer,
} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/answers/pieces/defaultAnswers";

export interface Answers extends
ComponentNameAnswer,
MenuItemAnswer {}

export const chartComponentQuestions: StudioTemplateProperty[] = [
  createComponentNameQuestion({
    defaultValue: 'ChartComponent',
  }),
  menuItemQuestion,
];
