#IMC
def calc_imc(imc):
  if imc <18.5:
    print("Abaixo do peso")
  elif 18.5<= imc<= 24.9:
    print("Normal")
  elif 25<= imc <=29.9:
    print("Sobrepeso")
  elif 30<= imc <=34.9:
    print("Obesidade I")
  elif 35<= imc <=39.9:
    print("Obesidade II")
  else: print("Obesidade grave")

def calculo():
  imc = float(input("Informe seu imc: "))
  resultado = calc_imc(imc)

if __name__ == "__main__":
  calculo()
