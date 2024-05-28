CREATE database wepink;
USE wepink;


CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS referencia_exames (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_exame VARCHAR(255) NOT NULL,
    parametro VARCHAR(255) NOT NULL,
    valor_minimo DECIMAL(10,2),
    valor_maximo DECIMAL(10,2)
);
INSERT INTO referencia_exames (tipo_exame, parametro, valor_minimo, valor_maximo)
VALUES
	('Eritrócitos', '10^6/uL', 4.2, 5.9),
    ('Hemoglobina', 'g/dL', 12.0, 18.0),
    ('Hematócrito', '%', 37.0, 50.0),
    ('VCM', 'fL', 80, 98),
    ('HCM', 'pg', 28, 32),
    ('CHCM', 'g/dL', 32, 36),
    ('RDW', '%', 9, 14.5),
    ('Leucócitos', '%', 100, 100),
    ('Neutrófilos', '%', 50, 70),
    ('Eosinófilos', '%', 0, 3),
    ('Basófilos', '%', 0, 1),
    ('Linfócitos', '%', 30, 45),
    ('Monócitos', '%', 0, 6),
    ('Plaquetas', '/uL', 150000.0, 450000.0),
    ('PCR', 'mg/dL', 0, 0.5),
    ('LDH','U/L', 80, 225),
    ('Ferro','ug/dL', 50, 150),
    ('Ferritina','ng/mL', 24, 336),
    ('Ácido Fólico','ng/mL', 1.8, 9),
    ('Uréia','mg/dL', 20, 50),
    ('Creatinina','mg/dL', 0.5, 1.3),
    ('Potássio','mmol/L', 3.5, 5),
    ('Sódio','mmol/L', 136, 145),
    ('Cloro','mmol/L', 98, 106),
    ('Magnésio','mg/dL', 1.6, 2.6),
    ('Fósforo','mg/dL', 3, 4.5),
    ('Cálcio','mg/dL', 8.6, 10.2),
    ('Vitamina D','ng/mL', 30, 60),
    ('Glicose','mg/dL', 70, 99),
    ('Insulina','mU/L', 3, 25),
    ('Triglicérides','mg/dL', 0, 150),
    ('Colesterol Total','mg/dL', 0, 200),
    ('HDL - Colesterol','mg/dL', 40, 60),
    ('LDL - Colesterol','mg/dL', 0, 115),
    ('Creatinofosfoquinase (CPK)', 'U/L', 30, 170),
    ('Ácido Úrico','mg/dL', 3, 7),
    ('Fosfatase Alcalina','U/L', 30, 120),
    ('Bilirrubina Total','mg/dL', 0.3, 1),
    ('Bilirrubina Direta','mg/dL', 0.1, 0.3),
    ('Bilirrubina Indireta','mg/dL', 0.2, 0.7),
    ('Proteínas Totais','g/dL', 5.5, 9),
    ('Albumina','g/dL', 3.5, 5.5),
    ('Globulina','g/dL', 2, 3.5),
    ('Transferrina','mg/dL', 200, 400),
    ('TSH','uU/mL', 0.5, 4),
    ('T3 Total (Triiodotironina)','ng/dL', 80, 180),
    ('T4 (Tiroxina)','ug/dL', 5, 12),
    ('Progesterona','ng/mL', 0.28, 1.22),
    ('Testosterona Total','ng/dL', 18, 54),
    ('Testosterona Total','ng/dL', 291, 1100),
    ('Hormônio de Crescimento - HGH basal','ng/mL', 0, 5),
    ('PSA Total','ng/mL', 0, 4),
    ('CA 125','U/mL', 0, 35),
    ('CA 19-9','U/mL', 0, 37),
    ('CA-72 4','U/mL', 0, 38),
    ('Alfa Fetoproteína','ng/mL', 0, 10),
    ('Calcitonina','pg/mL', 0, 8.4),
    ('Zinco Sanguineo','ug/dL', 75, 140);

CREATE TABLE Consultas (
    especialidade varchar(50) PRIMARY KEY,
    dataCons data,
    horario time,
    --resumoCons varchar(150),
    retorno text,
    lembrete text
);