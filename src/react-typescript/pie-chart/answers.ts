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
        idKey: string,
        labelKey: string,
        valueKey: string,
    }

const idKeyQuestion: StudioTemplateProperty = {
    caption: "Id attribute",
    code: "idKey",
    propertyType: StudioTemplatePropertyType.ATTRIBUTE,
    required: true,
    options: ["string", "number"],
    relatedProperty: 'query',
};

const labelKeyQuestion: StudioTemplateProperty = {
    caption: "Label attribute",
    code: "labelKey",
    propertyType: StudioTemplatePropertyType.ATTRIBUTE,
    required: true,
    options: ["string", "number", "date", "datetime", "time"],
    relatedProperty: 'query',
}

const valueKeyQuestion: StudioTemplateProperty = {
    caption: "Value attribute",
    code: "valueKey",
    propertyType: StudioTemplatePropertyType.ATTRIBUTE,
    required: true,
    options: ["number"],
    relatedProperty: 'query',
}

export const chartComponentQuestions: StudioTemplateProperty[] = [
    entityQuestion,
    createComponentNameQuestion({defaultValue: 'PieChart'}),
    createQueryQuestion(),
    idKeyQuestion,
    labelKeyQuestion,
    valueKeyQuestion,
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