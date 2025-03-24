num =[]
while True:
    score = int(input('점수 입력: '))
    if score == 0:
        break
    num.append(score)

print(num)
#print("최대값은", max(num), "점이고,", "최소값은", min(num),"점입니다" )
print(f'최대값은 {max(num)}점이고 최소값은 {min(num)}점입니다.')
