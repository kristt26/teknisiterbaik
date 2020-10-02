<?php
/*
 * Generated by CRUDigniter v3.2
 * www.crudigniter.com
 */

class Nasabah_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
     * Get nasabah by idnasabah
     */
    public function get_nasabah($idnasabah)
    {
        return $this->db->get_where('nasabah', array('idnasabah' => $idnasabah))->row_array();
    }

    /*
     * Get all nasabah
     */
    public function get_all_nasabah()
    {
        $this->db->order_by('idnasabah', 'desc');
        return $this->db->get('nasabah')->result_array();
    }

    /*
     * function to add new nasabah
     */
    public function add_nasabah($params)
    {
        $this->db->insert('nasabah', $params);
        return $this->db->insert_id();
    }

    /*
     * function to update nasabah
     */
    public function update_nasabah($idnasabah, $params)
    {
        $this->db->where('idnasabah', $idnasabah);
        return $this->db->update('nasabah', $params);
    }

    /*
     * function to delete nasabah
     */
    public function delete_nasabah($idnasabah)
    {
        return $this->db->delete('nasabah', array('idnasabah' => $idnasabah));
    }
}
