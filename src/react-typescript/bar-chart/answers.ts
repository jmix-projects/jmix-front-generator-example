import {
    createComponentNameQuestion,
    ComponentNameAnswer,
    menuItemQuestion,
    MenuItemAnswer, entityQuestion, createQueryQuestion, EntityAnswer, QueryAnswer,
} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/answers/pieces/defaultAnswers";
import {
    StudioTemplateProperty,
    StudioTemplatePropertyType
} from "@haulmont/jmix-front-generator/lib/common/studio/studio-model";
import {ProjectModel} from "@haulmont/jmix-front-generator/lib/common/model/cuba-model";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "@haulmont/jmix-front-generator/lib/common/cli-options";
import {askQuestions} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {isStringIdEntity} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/entity";
import {askStringIdQuestions} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/answers/pieces/stringId";

export interface Answers extends
    ComponentNameAnswer,
    EntityAnswer,
    QueryAnswer,
    MenuItemAnswer {
      indexBy: string,
      keys: string[],
    }

const indexByQuestion: StudioTemplateProperty = {
    caption: "Attribute to use to index the data (indexBy)",
    code: "indexBy",
    propertyType: StudioTemplatePropertyType.ATTRIBUTE,
    required: true,
    options: ["string", "number", "date", "datetime", "time"],
    relatedProperty: 'query',
};

const keysQuestion: StudioTemplateProperty = {
    caption: "Attributes to use to determine each series (keys)",
    code: "keys",
    propertyType: StudioTemplatePropertyType.ATTRIBUTES_ARRAY,
    required: true,
    options: ["number"],
    relatedProperty: 'query',
}

export const chartComponentQuestions: StudioTemplateProperty[] = [
    entityQuestion,
    createComponentNameQuestion({defaultValue: 'BarChart'}),
    createQueryQuestion(),
    keysQuestion,
    indexByQuestion,
    menuItemQuestion,
];


export const getAnswersFromPrompt = async (
    projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<Answers> => {
    const initialQuestions = [
        ...chartComponentQuestions
    ];

    const answers: Answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);

    if (isStringIdEntity(projectModel, answers.entity)) {
        const stringIdAnswers = await askStringIdQuestions(
            answers.entity,
            projectModel,
            gen
        );

        return {
            ...answers,
            ...stringIdAnswers
        }
    }

    return answers
};