import fs from 'fs'

class CsvUtils {

    static getFieldsMetaData(fieldKey, displayName = fieldKey) {

        return {
            fieldDisplayKey: fieldKey,
            fieldDisplayName: displayName,
            displayHandler: undefined,
            sortable: true,
            sortHandler: undefined,
            filterable: false,
            filterHandler: undefined,
            editable: false,
            updateHandler: undefined,
            deleteHandler: undefined,
        }
    }

    static async ParseToObject(filePath, delim = ',') {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        let lines = data.split('\n');
                        let fields = lines[0].split(delim)
                        let records = lines.map(line => {
                            let o = {}
                            let splitLine = line.split(delim);
                            for (let index = 1; index < fields.length; index++) {
                                let fieldName = fields[index];
                                let value = splitLine[index];
                                o[fieldName] = value;
                            }
                            return o;
                        });
                        resolve({fields, records});
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    static async  ParseToArray(filePath, delim = ',') {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        let lines = data.split('\n');
                        let fields = lines[0].split(delim)
                        let records = lines.map(line => line.split(delim));
                        resolve({fields, records});
                    }
                });

            } catch (e) {
                reject(e);
            }
        });
    }
}


export default CsvUtils