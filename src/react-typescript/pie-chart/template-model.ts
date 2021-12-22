import {Answers} from "./answers";
import {Options} from "./options";
import {ProjectModel, Entity} from "@haulmont/jmix-front-generator/lib/common/model/cuba-model";
import {CommonTemplateModel} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/common";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";
import {deriveEntityCommon} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/util";

export interface TemplateModel extends
    CommonTemplateModel,
    UtilTemplateModel {
      entity: Entity,
      query: string,
      idKey: string,
      labelKey: string,
      valueKey: string,
    }

export async function deriveTemplateModel(
    answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
  ): Promise<TemplateModel> {
    return {
      idKey: answers.idKey,
      valueKey: answers.valueKey,
      labelKey: answers.labelKey,
      query: answers.query,
      entity: answers.entity,
      ...deriveEntityCommon(options, answers),
      ...templateUtilities,
    }
}
