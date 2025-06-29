import React, { useState } from 'react';

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNomes] = useState('');
    const [editando, setEditando] = useState(null);

    //carrega o localstorage
    useEffect(() => {
        const dadosSalvos = JSON.parse(localStorage.getItem('usuarios'));
        if (dadosSalvos) setUsuarios(dadosSalvos);
    }, []);


    //atualiza o localstorage sempre que mudar a lista
    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
    }, [usuarios]);
