import {componentOptionsConfig} from "@haulmont/jmix-front-generator/lib/common/cli-options";
import path from "path";
import {defaultPipeline} from "@haulmont/jmix-front-generator/lib/building-blocks/pipelines/defaultPipeline";
import {chartComponentQuestions, Answers} from "./answers";
import {Options} from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {ComponentOptions} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/options/pieces/component";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";

export class ReactComponentGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, Answers, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: chartComponentQuestions,
      stages: {
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

const description = 'Empty screen template.';
const icon = "blank.svg"
const index = 0;

export {
  ReactComponentGenerator as generator,
  componentOptionsConfig as options,
  chartComponentQuestions as params,
  description,
  icon,
  index,
};
