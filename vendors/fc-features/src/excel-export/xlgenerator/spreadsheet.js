import{toWorkBookRel,getWorkBookSheet,generateSheet}from'./xlutil.js';export default class CreateSheets{constructor(){this.sheets=[]}addSheet(a){let b={id:this.sheets.length+1,rId:'rId'+(3+this.sheets.length),name:a,rows:{}};this.sheets.push(b)}createCell(a){if(a.sheet!==parseInt(a.sheet,10))throw new Error('Invalid sheet number'+a.sheet);if(a.row!==parseInt(a.row,10))throw new Error('Invalid row number '+a.row+'in sheet '+a.sheet);if(a.column!==parseInt(a.column,10))throw new Error('Invalid column number '+a.column+'in row '+a.row+' in sheet '+a.sheet);let{sheet:b,row:c,column:d,value:e}=a;if(this.sheets[b])this.sheets[b].rows[c]?this.sheets[b].rows[c][d]=e:this.sheets[b].rows[c]={[d]:e};else throw new Error(' Sheet'+b+' does not exists')}createWorkBook(){let a='<?xml version="1.0" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>';for(let b=0;b<this.sheets.length;b++)a+=getWorkBookSheet(this.sheets[b]);return a+'</sheets><calcPr/></workbook>'}createworkBookRels(){let a='<?xml version="1.0" ?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';a+='<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';for(let b=0;b<this.sheets.length;b++)a+=toWorkBookRel(this.sheets[b],b+1);return a+'</Relationships>'}createContentType(){let a='<?xml version="1.0" standalone="yes" ?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="application/xml" Extension="xml"/>';a+='<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>',a+='<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>',a+='<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml" />';for(let b=1;b<=this.sheets.length;b++)a=a+'<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet'+b+'.xml"/>';return a+'</Types>'}fileSheets(a){for(let b=0;b<this.sheets.length;b++)a.file('worksheets/sheet'+(b+1)+'.xml',generateSheet(this.sheets[b]))}}