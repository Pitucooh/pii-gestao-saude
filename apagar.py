#PRESSÃO ARTERIAL
def verificar_pressao_arterial(sistolica, diastolica):
    if sistolica < 90 and diastolica < 60:
        return "Pressão baixa"
    elif sistolica <120 and  diastolica <80:
      return "Pressão otima"
    elif 120 <= sistolica <= 129  and  80 <= diastolica <=84:
      return "Pressão normal"
    elif  130 <= sistolica <= 139 and 85 <= diastolica <=89:
      return "Anteção!"
    else:
        return "Pressão alta"

def main():
    sistolica = float(input("Informe a pressão arterial sistólica (mmHg): "))
    diastolica = float(input("Informe a pressão arterial diastólica (mmHg): "))

    resultado = verificar_pressao_arterial(sistolica, diastolica)
    print("Resultado:", resultado)

if __name__ == "__main__":
    main()
