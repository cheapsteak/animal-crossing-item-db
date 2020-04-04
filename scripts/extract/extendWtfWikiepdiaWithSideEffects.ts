import wtf_wikipedia from 'wtf_wikipedia';
import strip from 'wtf_wikipedia/src/template/_parsers/_strip';

wtf_wikipedia.extend((_models: any, templates: any) => {
  templates.tablecontent = (
    tmpl: string,
    list: Array<{ [fieldName: string]: object }>,
  ) => {
    /* These come in the form of
    {{TableContent|type=fish
    | [[Bitterling]]
    | [[File: Bitterling HHD Icon.png]]
    | 900
    | River
    | 1
    | <small>All day</small>
    | ✓
    | ✓
    | ✓
    | -
    | -
    | -
    | -
    | -
    | -
    | -
    | ✓
    | ✓
    }}
    It looks like the only reason these table row values are wrapped in the TableContent template is for styling purposes.
    Stripping the template away lets the parser parse these as normal table rows
    */
    const val = '|-\n' + strip(tmpl).slice(tmpl.indexOf('\n') - 1);
    return val;
  };

  templates.tablecontentbugs = (
    tmpl: string,
    list: Array<{ [fieldName: string]: object }>,
  ) => {
    const val = '|-\n' + strip(tmpl).slice(tmpl.indexOf('\n') - 1);
    return val;
  };
});
