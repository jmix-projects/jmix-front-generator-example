import {writeComponentI18nMessages} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/i18n";
import {WriteStage} from "@haulmont/jmix-front-generator/lib/building-blocks/pipelines/defaultPipeline";
import {addMenuItem, addAppMenu} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/menu";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {addComponentPreviews} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/previews-registration";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift} = options;
    const {className, nameLiteral, menuItem} = templateModel;
  
    const extension = '.tsx';

    writeChartComponent(gen, extension, templateModel);
    writeComponentI18nMessages(
      gen, 
      className, 
      dirShift, 
      projectModel.project?.locales
    );

    addAppMenu(gen, dirShift, className, menuItem);
    addMenuItem(gen, dirShift, className, nameLiteral);
    addComponentPreviews(gen, dirShift, className, nameLiteral);
}

function writeChartComponent<M extends {className: string}>(
    gen: YeomanGenerator,
    extension: string,
    model: M
  ) {
    gen.fs.copyTpl(
      gen.templatePath('Component' + extension),
      gen.destinationPath(model.className + extension), model
    );
  }
