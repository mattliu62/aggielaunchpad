#include <iostream>
#include <string.h>
#include <fstream>
#include <sstream>
#include <map>
#include <vector>
#include <algorithm>

using namespace std;

map <string, string> operands;
map <string, string> mode;
map <string, string> labels;

void buildMaps(){
    operands["LDA"] = "00";
    operands["LDX"] = "01";
    operands["LDS"] = "02";
    operands["LDF"] = "03";
    operands["STA"] = "04";
    operands["STX"] = "05";
    operands["STS"] = "06";
    operands["STF"] = "07";
    operands["PSH"] = "08";
    operands["POP"] = "09";
    operands["CLR"] = "0A";
    operands["SET"] = "0B";
    operands["PSHA"] = "FFF010";
    operands["PSHX"] = "FFF011";
    operands["PSHF"] = "FFF012";
    operands["POPA"] = "FFF013";
    operands["POPX"] = "FFF014";
    operands["POPF"] = "FFF015";
    operands["ADA"] = "10";
    operands["ADX"] = "11";
    operands["ADS"] = "12";
    operands["ADF"] = "13";
    operands["SBA"] = "14";
    operands["SBX"] = "15";
    operands["SBS"] = "16";
    operands["SBF"] = "17";
    operands["MUL"] = "18";
    operands["DIV"] = "19";
    operands["MOD"] = "1A";
    operands["CMA"] = "20";
    operands["CMX"] = "21";
    operands["CMS"] = "22";
    operands["CMF"] = "23";
    operands["SHRA"] = "FFF022";
    operands["SHLA"] = "FFF023";
    operands["JSR"] = "41";
    operands["RTN"] = "FFF040";
    operands["JEQ"] = "48";
    operands["JLT"] = "4A";
    operands["JGE"] = "4B";
    operands["NOP"] = "FFF038";
    operands["HLT"] = "FFFFFF";

    mode["#"] = "0";
    //CASE WITH NO MODE
    mode["+"] = "4";
    mode["*"] = "6";
    mode["&"] = "8";
    mode["#!"] = "1";
    mode["!"] = "3";
    mode["+!"] = "5";
    mode["*!"] = "7";
    mode["&!"] = "9";
}

std::vector<string> illegal = {"STA", "STX", "STS", "STF", "POP", "CLR", "SET", "JSR", "JEQ", "JLT", "JGE"};

void checkIllegal(string operand, string mode)
{
    if (std::find(illegal.begin(), illegal.end(), operand) != illegal.end())
    {
        if (mode == "#" || mode == "#!")
        {
            cout << "ASSEMBLER ERROR : instruction using unsupported addressing mode." << endl;
            exit(0); 
        }
    }
}

string b16Convert(string b10)
{
    int base10 = stoi(b10);
    string output;
    string rBase16;
    while(base10 != 0)
    {   
        if ((base10 % 16) >= 10 && (base10 % 16) <= 15)
        {
            char temp = ((base10 % 16) + 55);
            base10 = base10/ 16;
            output += temp;
        }
        else
        {
            string subStr = to_string(base10 % 16);
            base10 = base10/ 16;
            output += subStr;
            }
        }
        for (int i = (output.length() - 1); i >= 0; i--)
        {
            rBase16 += output[i];
        }
    return (rBase16);
}

string mConvert(string line) //CONVERTS ASSEMBLY TO MACHINE CODE
{
    string chunk1, chunk2, chunk3, chunk4;
    string oBit, mBit, rBit;
    string output;
    stringstream strDivide(line);
    int spaceCount = 0;
    for (unsigned i = 0; i < line.size(); i++)
    {
        if (line[i] == ' ')
        {
            spaceCount +=1;
        }
    }
    if (spaceCount == 0)
    {
        std::getline(strDivide, chunk1, ' ');
        if (chunk1.find(':') != std::string::npos)
        {
            //LABEL CASE
        }
        else
        {
            output = operands[chunk1];
            return output;
        }
    }
    if (spaceCount == 1)
    {
        std::getline(strDivide, chunk1, ' ');
        std::getline(strDivide, chunk2, ' ');
        if (chunk1 == ".word")
        {
            rBit = chunk2;
           // rBit.erase(rBit.size() - 1, 1);
            while (rBit.size() < 6) //may need tweak
            {
                rBit.insert(0, 1, '0');
            }
            output = rBit;
        }
        else
        {
            oBit = operands[chunk1];
            mBit = "2";
            if (labels.count(chunk2) == 1)
            {
                rBit = labels[chunk2];
            }
            else if (chunk2.find('$') != std::string::npos)
            {
                chunk2.erase(0,1);
                rBit = chunk2;
                //rBit.erase(rBit.size() - 1, 1);
            }
            else
            {
                try
                {
                    rBit = b16Convert(chunk2);
                }
                catch (int e)
                {
                    cout << "ASSEMBLER ERROR: undefined label." <<endl;
                    exit(0);
                }
            }
            while (rBit.size() < 3)
            {
                rBit.insert(0, 1, '0');
            }
        
        }
    }
    else if (spaceCount == 2)
    {
        std::getline(strDivide, chunk1, ' ');
        std::getline(strDivide, chunk2, ' ');
        std::getline(strDivide, chunk3, ' ');
        oBit = operands[chunk1];
        mBit = mode[chunk2];
        if (labels.count(chunk3) == 1)
        {
            rBit = labels[chunk3];
        }
        else if (chunk3.find('$') != std::string::npos)
        {
            chunk3.erase(0,1);
            rBit = chunk3;
            //rBit.erase(rBit.size() - 1, 1);
        }
        else
        {
                try
                {
                    rBit = b16Convert(chunk3);
                }
                catch (int e)
                {
                    cout << "ASSEMBLER ERROR: undefined label." <<endl;
                    exit(0);
                }
        }
        while (rBit.size() < 3)
        {
            rBit.insert(0, 1, '0');
        }
        checkIllegal(chunk1, chunk2);
    }
    else if (spaceCount == 3)
    {
        std::getline(strDivide, chunk1, ' ');
        std::getline(strDivide, chunk2, ' ');
        std::getline(strDivide, chunk3, ' ');
        std::getline(strDivide, chunk4, ' ');
        oBit = operands[chunk1];
        mBit = mode[chunk2 + chunk3];
        if (labels.count(chunk4) == 1)
        {
            rBit = labels[chunk4];
        }
        if (chunk4.find('$') != std::string::npos)
        {
            chunk4.erase(0,1);
            rBit = chunk4;
            //rBit.erase(rBit.size() - 1, 1);
        }
        else
        {
                try
                {
                    rBit = b16Convert(chunk4);
                }
                catch (int e)
                {
                    cout << "ASSEMBLER ERROR: undefined label." <<endl;
                    exit(0);
                }
        }
        while (rBit.size() < 3)
        {
            rBit.insert(0, 1, '0');
        }
        checkIllegal(chunk1, chunk2 + chunk3);

    }
    output = oBit + mBit + rBit;
    return output;
}

void buildLabels(int argNum, char *args[])
{
    string line;
    int labelCounter = 0;
    ifstream input (args[1]); //OPENS FIRST ARGUMENT AS FILE
    if (input.is_open())
    {
        ofstream output(args[2]);
        while (getline(input, line)) //WRITES CONVERTED LINES TO OUTPUT FILE
        {
                if (line.find(':') != std::string::npos)
                {
                    //LABEL CASE
                    line.erase(line.size() - 1, 1);
                    string labelStr = to_string(labelCounter);
                    labelStr = b16Convert(labelStr);
                    /*while (labelStr.size() < 3) 
                    {
                        labelStr.insert(0, 1, '0');
                    }*/
                    if (labels.count(line) == 1)
                    {
                        cout << "ASSEMBLER ERROR: label defined multiple times." <<endl;
                        exit(0); 
                    }
                    labels[line] = labelStr;     
                }
                else
                {
                    labelCounter += 1;
                }
            
        }
    }
}


int main(int argc, char *argv[])
{
    buildLabels(argc, argv);
    buildMaps();
    string line;
   // int labelCounter = 0;
    ifstream input (argv[1]); //OPENS FIRST ARGUMENT AS FILE
    if (input.is_open())
    {
        ofstream output(argv[2]);
        while (getline(input, line)) //WRITES CONVERTED LINES TO OUTPUT FILE
        {
            if (output.is_open())
            {
                if (line.find(':') != std::string::npos)
                {
                    continue;
                    //LABEL CASE
                    /*line.erase(line.size() - 1, 1);
                    string labelStr = to_string(labelCounter);
                    labelStr = b16Convert(labelStr);
                    while (labelStr.size() < 3) 
                    {
                        labelStr.insert(0, 1, '0');
                    }
                    labels[line] = labelStr;   */  
                }
                else
                {
                    while (line[0] == ' ')
                    {
                            line.erase(0, 1);
                    }
                    string outLine = mConvert(line);
                    //labelCounter += 1;
                    output << outLine << endl;
                }
                
            }
            //cout << mConvert(line) << endl;
        }
    }

}
