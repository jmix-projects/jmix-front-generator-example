import {ProjectModel} from "@haulmont/jmix-front-generator/lib/common/model/cuba-model";
import {CommonTemplateModel} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/common";
import {Answers} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";
import {deriveEntityCommon} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/common";

export interface TemplateModel extends CommonTemplateModel {}

export async function deriveTemplateModel(
    answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
  ): Promise<TemplateModel> {
    return {...deriveEntityCommon(options, answers)}
}
