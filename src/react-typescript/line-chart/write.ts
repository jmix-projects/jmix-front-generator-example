import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {WriteStage} from "@haulmont/jmix-front-generator/lib/building-blocks/pipelines/defaultPipeline";
import {writeComponentI18nMessages} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/i18n";
import {addAppMenu} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/menu";
import {addMenuItem} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/previews-registration";
import {YeomanGenerator} from "@haulmont/jmix-front-generator/lib/building-blocks/YeomanGenerator";
import {addToPalette} from "@haulmont/jmix-front-generator/lib/building-blocks/stages/writing/pieces/palette";

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
    addToPalette(gen, dirShift, className);
}

function writeChartComponent<M extends {className: string}>(
    gen: YeomanGenerator,
    extension: string,
    model: M
  ) {
    gen.fs.copyTpl(
      gen.templatePath('LineChart' + extension),
      gen.destinationPath(model.className + extension), model
    );
  }
