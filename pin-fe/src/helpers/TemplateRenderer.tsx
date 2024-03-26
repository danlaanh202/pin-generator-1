import React from "react";
import { TemplateContext } from "../contexts/TemplateContext";

export default class TemplateRenderer {
  constructor() {
    this.renderers = {};
    this.initRenderers();
  }

  initRenderers() {
    try {
      this.registerImageRenderer();
      this.registerTextRenderer();
      this.registerBoxRenderer();
    } catch (e) {
      console.error(e);
    }
  }
  registerImageRenderer() {
    this.registerRenderer("image", (comp: any, componentIndex: number) => {
      const { wrapperStyles, styles, imageUrl, imageStyles } = comp;
      return this.renderWithCondition(
        comp,
        <TemplateContext.Consumer>
          {({selectComponent, initTemplateRef}) => {
            return (
              <div onClick={() => selectComponent(componentIndex)} ref={(el) => initTemplateRef(el, componentIndex)} style={wrapperStyles} >
                <div style={styles}>
                  <img style={imageStyles} src={imageUrl} />
                </div>
              </div>
            );
          }}
        </TemplateContext.Consumer>
      );
    });
  }
  registerTextRenderer() {
    this.registerRenderer("text", (comp: any, componentIndex: number) => {
      const { wrapperStyles, styles, textContent } = comp;

      return this.renderWithCondition(
        comp,
        <TemplateContext.Consumer>
          {({selectComponent, initTemplateRef}) => {
            return (
              <div onClick={() => selectComponent(componentIndex)} ref={(el) => initTemplateRef(el, componentIndex)} style={wrapperStyles} >
                <div style={styles}>{textContent}</div>
              </div>
            );
          }}
        </TemplateContext.Consumer>
      );
    });
  }
  registerBoxRenderer() {
    this.registerRenderer("box", (comp: any, componentIndex: number) => {
      const { wrapperStyles, styles } = comp;
    
      return this.renderWithCondition(
        comp,
        <TemplateContext.Consumer>
          {({selectComponent, initTemplateRef}) => {
            return (
              <div onClick={() => selectComponent(componentIndex)} ref={(el) => initTemplateRef(el, componentIndex)} style={wrapperStyles} >
                <div style={styles}></div>
              </div>
            );
          }}
        </TemplateContext.Consumer>
      );
    });
  }

  registerRenderer(index: any, renderer: any) {
    this.renderers[index] = renderer;
  }

  render(index: any, comp: any, componentIndex: number) {
    return this?.renderers?.[index]?.(comp, componentIndex);
  }

  renderWithCondition(comp: any, element: any) {
    return comp && element;
  }
}
