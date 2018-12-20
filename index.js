var story = require('./story.json');
var resource = require('./resource.json');

/**
 * @param {Story} story
 * @param {string} [version=1.1] 
 * Determinates if the story is of last schema version.
 * @returns {boolean} is version matches
 */
const isNewSchema = ( story, version = '1.1' ) => story.metadata.version === version;

/**
 * @param {Story} story
 * @returns the tempate name.
 */
const getTemplateName = ( story ) => {
  if ( isNewSchema( story ) ) {
    return story.settings.templateId;
  }
  return story.settings.template;
};

/**
 * @param {Story} story
 * @param {Tempate[]} tempates
 * With the new tempate format, the `tempate` property was renamed `tempateId`
 * @returns {Template} template used by the story.
 */
const findTempateByVersion = ( story, templates ) => {
  const templateId = getTemplateName( story );
  return templates.find( ( thatTemplate ) => thatTemplate.id === templateId );
};

/**
 * 
 * @param {Story} story
 * @returns {Object} styles locations.
 */
const getStyles = ( story ) => {
  if ( isNewSchema( story ) ) {
    const templateId = getTemplateName( story );
    return story.settings.styles[templateId];
  }
  return story.settings;
};

module.exports = {
  story: story,
  resource: resource,
  isNewSchema,
  getTemplateName,
  findTempateByVersion,
  getStyles,
};
